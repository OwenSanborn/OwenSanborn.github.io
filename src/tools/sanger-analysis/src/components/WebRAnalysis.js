import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  ScatterController,
  Filler
} from 'chart.js';
import * as parsers from 'bio-parsers';
import { Buffer } from 'buffer';

// Polyfill Buffer for browser
window.Buffer = Buffer;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  ScatterController,
  Filler
);

// Reverse complement a DNA sequence
const reverseComplement = (seq) => {
  const complement = { 'A': 'T', 'T': 'A', 'G': 'C', 'C': 'G', 'N': 'N' };
  return seq.split('').reverse().map(base => complement[base] || 'N').join('');
};

// Hairpin patterns for validation
// Forward: TT[AGN][GN]A repeating (TT fixed; editing site and bleedover allow N)
const FWD_HAIRPIN_PATTERN = /TT[AGN][GN]ATT[AGN][GN]ATT[AGN][GN]ATT[AGN][GN]ATT[AGN][GN]ATT[AGN][GN]A/;
// Reverse: T[CN][TCN]AA repeating (rev comp of TT[AGN][GN]A)
const REV_HAIRPIN_PATTERN = /T[CN][TCN]AAT[CN][TCN]AAT[CN][TCN]AAT[CN][TCN]AAT[CN][TCN]AAT[CN][TCN]AA/;

const WebRAnalysis = () => {
  const [files, setFiles] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('');

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    const validFiles = uploadedFiles.filter(file =>
      file.name.endsWith('.ab1') && file.size <= 10 * 1024 * 1024
    );

    if (validFiles.length !== uploadedFiles.length) {
      setError('Some files are invalid. Please upload .ab1 files under 10MB.');
      return;
    }

    setFiles(validFiles);
    setMetadata(validFiles.map((file) => ({
      fileName: file.name,
      group: '',
      direction: 'fwd'
    })));
    setError(null);
    setResults(null);
  };

  const handleMetadataChange = (index, field, value) => {
    const newMetadata = [...metadata];
    newMetadata[index][field] = value;
    setMetadata(newMetadata);
  };

  const processFiles = async () => {
    if (!metadata.length) return;

    setLoading(true);
    setError(null);
    setProcessingStatus('Loading analysis tools...');

    try {
      console.log('🔧 Using bio-parsers...');
      console.log('✅ bio-parsers:', parsers);
      const results = [];

      // Prepare group and replicate info
      const replicateCounts = {};
      const processedData = metadata.map((meta, idx) => {
        const group = meta.group.trim() || 'default';
        replicateCounts[group] = (replicateCounts[group] || 0) + 1;
        return {
          file: files[idx],
          fileName: meta.fileName,
          group: group,
          replicate: replicateCounts[group],
          direction: meta.direction || 'fwd'
        };
      });

      for (let i = 0; i < processedData.length; i++) {
        const { file, fileName, group, replicate, direction } = processedData[i];

        setProcessingStatus(`Reading ${fileName} (${i + 1}/${files.length})...`);

        try {
          console.log(`📄 Reading file: ${fileName}`);
          console.log(`📊 File size: ${file.size} bytes`);

          // Read .ab1 file with bio-parsers - pass the File object directly
          const ab1Data = await parsers.ab1ToJson(file);
          console.log(`🧬 ab1Data:`, ab1Data);
          console.log(`🧬 ab1Data type:`, Array.isArray(ab1Data) ? 'Array' : typeof ab1Data);
          console.log(`🧬 ab1Data[0]:`, ab1Data[0]);

          // bio-parsers returns an array, get the first element
          const seq = Array.isArray(ab1Data) ? ab1Data[0] : ab1Data;
          console.log(`🧬 seq:`, seq);

          if (!seq || !seq.parsedSequence) {
            console.error('❌ Failed to parse .ab1 file. seq:', seq);
            throw new Error('Failed to parse .ab1 file');
          }

          const parsedSeq = seq.parsedSequence;
          console.log(`🧬 parsedSequence:`, parsedSeq);

          const peakData = parsedSeq.chromatogramData;
          const baseCalls = parsedSeq.sequence;
          console.log(`📈 Peak data available:`, !!peakData);
          console.log(`🔤 Base calls length:`, baseCalls?.length);

          if (!peakData || !baseCalls) {
            console.error('❌ Missing data - peakData:', !!peakData, 'baseCalls:', !!baseCalls);
            throw new Error('Missing chromatogram data or base calls');
          }

          setProcessingStatus(`Analyzing ${fileName}...`);

          // Create data frame equivalent in JavaScript
          const sangs = [];
          const aTrace = peakData.aTrace || [];
          const cTrace = peakData.cTrace || [];
          const gTrace = peakData.gTrace || [];
          const tTrace = peakData.tTrace || [];
          const basePosData = peakData.basePos || [];

          for (let j = 0; j < baseCalls.length; j++) {
            const pos = basePosData[j] || j;
            const aArea = aTrace[pos] || 0;
            const cArea = cTrace[pos] || 0;
            const gArea = gTrace[pos] || 0;
            const tArea = tTrace[pos] || 0;
            const totArea = aArea + cArea + gArea + tArea;

            sangs.push({
              index: j + 1,
              baseCall: (baseCalls[j] || 'N').toUpperCase(),
              aArea,
              cArea,
              gArea,
              tArea,
              totArea,
              aPerc: totArea > 0 ? (100 * aArea / totArea) : 0,
              cPerc: totArea > 0 ? (100 * cArea / totArea) : 0,
              gPerc: totArea > 0 ? (100 * gArea / totArea) : 0,
              tPerc: totArea > 0 ? (100 * tArea / totArea) : 0
            });
          }

          // Filter data (equivalent to R script filtering)
          const sangsFiltered = sangs.filter(s => s.index > 20);
          console.log(`🔍 Filtered data points: ${sangsFiltered.length}`);

          const avgTotArea = sangsFiltered.reduce((sum, s) => sum + s.totArea, 0) / sangsFiltered.length;
          const peakTotAreaCutoff = avgTotArea / 10;
          const sangsFilt = sangsFiltered.filter(s => s.totArea > peakTotAreaCutoff);
          console.log(`✂️ After cutoff filter: ${sangsFilt.length} data points`);

          // Find guide sequence using hairpin validation and anchor
          const anchor = "CCAATTAAA";
          const sequence = sangsFilt.map(s => s.baseCall).join('');
          console.log(`🧬 Full sequence length: ${sequence.length}`);

          // Use explicit direction from metadata
          let useSequence = sequence;
          let useSangsFilt = sangsFilt;
          const orientation = direction;

          if (direction === 'rev') {
            console.log(`🔄 REV direction selected, reverse complementing sequence...`);
            useSequence = reverseComplement(sequence);
            useSangsFilt = [...sangsFilt].reverse().map(s => ({
              ...s,
              baseCall: reverseComplement(s.baseCall),
              aArea: s.tArea,
              tArea: s.aArea,
              gArea: s.cArea,
              cArea: s.gArea,
              aPerc: s.tPerc,
              tPerc: s.aPerc,
              gPerc: s.cPerc,
              cPerc: s.gPerc
            }));
          } else {
            console.log(`✅ FWD direction selected`);
          }

          const anchorPos = useSequence.indexOf(anchor);
          console.log(`🎯 Anchor position: ${anchorPos} (orientation: ${orientation})`);

          if (anchorPos === -1) {
            console.error(`❌ Anchor not found in ${fileName} after ${orientation} orientation`);
            results.push({
              file: fileName,
              group: group,
              replicate: replicate,
              value: null,
              error: `Anchor sequence not found (${orientation} orientation)`
            });
            continue;
          }

          // Guide starts after anchor
          const guideStartIdx = anchorPos + anchor.length;
          const guideLength = 36;

          // Target positions within guide (8, 13, 18, 23, 28, 33)
          const targetPosInGuide = [8, 13, 18, 23, 28, 33];
          let sumG = 0;
          let count = 0;

          targetPosInGuide.forEach(relPos => {
            const absPos = guideStartIdx + relPos - 1; // -1 for 0-indexing
            if (absPos < useSangsFilt.length) {
              const data = useSangsFilt[absPos];
              sumG += data.gPerc;
              count++;
            }
          });

          const meanEdit = count > 0 ? (sumG / count) : 0;
          console.log(`📊 ${orientation} - sumG: ${sumG}, count: ${count}, meanEdit: ${meanEdit}%`);

          // Extract chromatogram data for target region
          const targetRegionData = useSangsFilt.slice(guideStartIdx, guideStartIdx + guideLength);
          const chromatogramData = {
            positions: targetRegionData.map((d, i) => i + 1),
            baseCalls: targetRegionData.map(d => d.baseCall),
            aTrace: targetRegionData.map(d => d.aArea),
            cTrace: targetRegionData.map(d => d.cArea),
            gTrace: targetRegionData.map(d => d.gArea),
            tTrace: targetRegionData.map(d => d.tArea),
            targetPositions: targetPosInGuide
          };

          results.push({
            file: fileName,
            group: group,
            replicate: replicate,
            value: meanEdit,
            orientation: orientation,
            chromatogram: chromatogramData
          });
          console.log(`✅ Result added (${orientation}):`, results[results.length - 1]);

        } catch (fileErr) {
          console.error(`Error processing ${fileName}:`, fileErr);
          results.push({
            file: fileName,
            group: group,
            replicate: replicate,
            value: null,
            error: fileErr.message
          });
        }
      }

      console.log(`🎯 Total results collected: ${results.length}`);
      console.log(`📋 All results:`, results);

      // Group results and create chart
      const grouped = results.reduce((acc, d) => {
        if (d.error) return acc;
        const group = d.group;
        if (!acc[group]) acc[group] = { total: 0, count: 0, samples: [] };
        acc[group].total += d.value;
        acc[group].count++;
        acc[group].samples.push(d);
        return acc;
      }, {});

      console.log(`📊 Grouped data:`, grouped);

      const labels = Object.keys(grouped);
      console.log(`🏷️ Chart labels:`, labels);

      const validResults = results.filter(r => !r.error && r.value != null);
      const maxEdit = validResults.length > 0 ? Math.max(...validResults.map(d => d.value)) : 0;
      const chartMax = Math.min(100, Math.ceil(maxEdit + 10));
      const groupMeans = labels.map(group => grouped[group].total / grouped[group].count);
      console.log(`📈 Group means:`, groupMeans);

      const replicatePoints = {
        label: 'Replicates',
        data: labels.flatMap((group, i) =>
          grouped[group].samples.map(s => ({
            x: labels[i],
            y: s.value
          }))
        ),
        type: 'scatter',
        backgroundColor: '#000',
        pointStyle: 'circle',
        radius: 4,
        order: 1
      };

      const barData = {
        label: 'Mean Editing (%)',
        data: groupMeans,
        backgroundColor: '#6B9BD1',
        borderColor: '#6B9BD1',
        borderWidth: 1,
        order: 2
      };

      const finalResults = {
        labels,
        datasets: [barData, replicatePoints],
        rawData: results,
        chartMax
      };

      console.log(`🎨 Final chart data:`, finalResults);
      setResults(finalResults);
    } catch (err) {
      console.error(err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
      setProcessingStatus('');
    }
  };

  const chartOptions = (maxY) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Editing by Group',
        color: '#E6EDF3',
        font: { size: 16, weight: '300' }
      },
    },
    scales: {
      x: {
        type: 'category',
        title: { display: true, text: 'Group', color: '#E6EDF3' },
        ticks: { color: '#A8B2D1' },
        grid: { color: 'rgba(107, 155, 209, 0.1)' }
      },
      y: {
        beginAtZero: true,
        max: maxY,
        title: { display: true, text: 'Editing (%)', color: '#E6EDF3' },
        ticks: { color: '#A8B2D1' },
        grid: { color: 'rgba(107, 155, 209, 0.1)' }
      }
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    }
  });

  const exportToCSV = () => {
    if (!results) return;

    const rows = [["File", "Group", "Replicate", "Orientation", "Editing (%)", "Error"]];
    metadata.forEach((m, i) => {
      const result = results.rawData[i];
      rows.push([
        m.fileName,
        m.group || 'default',
        result?.replicate || '',
        result?.orientation || '',
        result?.value != null ? result.value.toFixed(2) : '',
        result?.error || ''
      ]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "sanger_results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ backgroundColor: '#1A1B26', minHeight: '100vh' }}>
      {/* Header Navigation */}
      <header style={{
        backgroundColor: 'rgba(26, 27, 38, 0.95)',
        backdropFilter: 'blur(4px)',
        borderBottom: '1px solid rgba(71, 85, 105, 0.2)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href="/" style={{ fontSize: '1.25rem', fontWeight: '300', color: '#E6EDF3', textDecoration: 'none', letterSpacing: '-0.025em' }}>
            OS
          </a>
          <a href="/" style={{ color: '#A8B2D1', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '300', letterSpacing: '0.025em', transition: 'color 0.3s' }}>
            Home
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#E6EDF3', marginBottom: '1rem', fontWeight: '300' }}>
            Sanger Sequence Analysis
          </h1>

        {/* File upload and analysis buttons */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
          <label style={{
            backgroundColor: '#6B9BD1',
            color: '#1A1B26',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            border: 'none',
            transition: 'all 0.3s'
          }}>
            <input
              type="file"
              accept=".ab1"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
            Select .ab1 Files
          </label>

          <span style={{ color: '#A8B2D1', fontSize: '0.9rem' }}>
            {files.length > 0 ? `${files.length} file(s) selected` : 'No files selected'}
          </span>

          {files.length > 0 && (
            <button
              onClick={processFiles}
              disabled={loading}
              style={{
                backgroundColor: '#6B9BD1',
                color: '#1A1B26',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '500',
                border: 'none',
                opacity: loading ? 0.6 : 1,
                transition: 'all 0.3s'
              }}
            >
              {loading ? 'Processing...' : 'Analyze'}
            </button>
          )}
        </div>

      {/* Table and Chart */}
      {metadata.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', fontSize: '0.85rem' }}>
          {/* Table */}
          <div>
            <table
              style={{
                width: '100%',
                backgroundColor: '#252733',
                color: '#E6EDF3',
                textAlign: 'center',
                borderCollapse: 'collapse',
                border: '1px solid rgba(107, 155, 209, 0.3)',
                borderRadius: '8px',
                overflow: 'hidden'
              }}
            >
              <thead style={{ backgroundColor: '#2D2F3D' }}>
                <tr>
                  <th style={{ color: '#E6EDF3', padding: '0.75rem', borderBottom: '1px solid rgba(107, 155, 209, 0.3)' }}>File</th>
                  <th style={{ color: '#E6EDF3', padding: '0.75rem', borderBottom: '1px solid rgba(107, 155, 209, 0.3)' }}>Group</th>
                  <th style={{ color: '#E6EDF3', padding: '0.75rem', borderBottom: '1px solid rgba(107, 155, 209, 0.3)' }}>Direction</th>
                  <th style={{ color: '#E6EDF3', padding: '0.75rem', borderBottom: '1px solid rgba(107, 155, 209, 0.3)' }}>Replicate</th>
                  <th style={{ color: '#E6EDF3', padding: '0.75rem', borderBottom: '1px solid rgba(107, 155, 209, 0.3)' }}>% Editing</th>
                </tr>
              </thead>
              <tbody>
                {metadata.map((meta, idx) => {
                  const result = results?.rawData?.[idx];
                  const hasError = result?.error;
                  const editingVal = result?.value != null ? result.value.toFixed(2) : '';

                  return (
                    <tr key={idx} style={{
                      borderBottom: '1px solid rgba(107, 155, 209, 0.2)',
                      backgroundColor: hasError ? 'rgba(255, 107, 107, 0.1)' : 'transparent'
                    }}>
                      <td style={{ color: '#E6EDF3', padding: '0.5rem' }}>{meta.fileName}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <input
                          style={{
                            backgroundColor: '#1A1B26',
                            color: '#E6EDF3',
                            border: '1px solid rgba(107, 155, 209, 0.3)',
                            borderRadius: '4px',
                            textAlign: 'center',
                            padding: '4px 8px',
                            width: '100%'
                          }}
                          value={meta.group}
                          onChange={e => handleMetadataChange(idx, 'group', e.target.value)}
                        />
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                          {['fwd', 'rev'].map(dir => (
                            <button
                              key={dir}
                              onClick={() => handleMetadataChange(idx, 'direction', dir)}
                              style={{
                                padding: '3px 10px',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '500',
                                fontSize: '0.8rem',
                                backgroundColor: meta.direction === dir ? '#6B9BD1' : '#2D2F3D',
                                color: meta.direction === dir ? '#1A1B26' : '#A8B2D1',
                                transition: 'all 0.2s'
                              }}
                            >
                              {dir.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td style={{ color: '#E6EDF3', padding: '0.5rem' }}>{result?.replicate || ''}</td>
                      <td style={{
                        color: hasError ? '#FF6B6B' : '#E6EDF3',
                        padding: '0.5rem'
                      }}>
                        {hasError ? 'N/A' : editingVal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {results && (
              <button
                onClick={exportToCSV}
                style={{
                  marginTop: '1rem',
                  backgroundColor: '#6B9BD1',
                  color: '#1A1B26',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'all 0.3s'
                }}
              >
                Export to CSV
              </button>
            )}
          </div>

          {/* Chart */}
          {results && (
            <div style={{
              height: '100%',
              minHeight: '500px',
              backgroundColor: '#252733',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid rgba(107, 155, 209, 0.3)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Bar data={results} options={chartOptions(results.chartMax)} />
            </div>
          )}
        </div>
      )}

      {/* Chromatogram Plots */}
      {results && results.rawData && (
        <div style={{ marginTop: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#E6EDF3', marginBottom: '1.5rem', fontWeight: '300' }}>
            Chromatogram Traces
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
            {[...results.rawData].sort((a, b) => a.group.localeCompare(b.group)).map((result, idx) => {
              if (!result.chromatogram) return null;

              const chrom = result.chromatogram;

              // Add zeros between data points for distinct peaks
              const interpolateWithZeros = (data) => {
                const result = [];
                for (let i = 0; i < data.length; i++) {
                  if (i > 0) {
                    result.push(0); // Add zero between peaks
                  }
                  result.push(data[i]);
                }
                return result;
              };

              const interpolatedLabels = [];
              for (let i = 0; i < chrom.positions.length; i++) {
                if (i > 0) {
                  interpolatedLabels.push(`${chrom.positions[i-1]}.5`);
                }
                interpolatedLabels.push(chrom.positions[i]);
              }

              const aTraceInterpolated = interpolateWithZeros(chrom.aTrace);
              const cTraceInterpolated = interpolateWithZeros(chrom.cTrace);
              const gTraceInterpolated = interpolateWithZeros(chrom.gTrace);
              const tTraceInterpolated = interpolateWithZeros(chrom.tTrace);

              const maxTrace = Math.max(
                ...aTraceInterpolated,
                ...cTraceInterpolated,
                ...gTraceInterpolated,
                ...tTraceInterpolated
              );

              const chromData = {
                labels: interpolatedLabels,
                datasets: [
                  {
                    label: 'C',
                    data: cTraceInterpolated,
                    borderColor: '#0000FF',
                    backgroundColor: 'rgba(0, 0, 255, 0.3)',
                    borderWidth: 2.5,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true
                  },
                  {
                    label: 'T',
                    data: tTraceInterpolated,
                    borderColor: '#FF0000',
                    backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    borderWidth: 2.5,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true
                  },
                  {
                    label: 'A',
                    data: aTraceInterpolated,
                    borderColor: '#00C000',
                    backgroundColor: 'rgba(0, 192, 0, 0.3)',
                    borderWidth: 2.5,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true
                  },
                  {
                    label: 'G',
                    data: gTraceInterpolated,
                    borderColor: '#FFFFFF',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: 2.5,
                    pointRadius: 0,
                    tension: 0.4,
                    fill: true
                  }
                ]
              };

              const chromOptions = {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 3,
                plugins: {
                  legend: {
                    display: true,
                    position: 'top',
                    labels: { color: '#E6EDF3', font: { size: 12 } }
                  },
                  title: {
                    display: true,
                    text: `Sample: ${result.file} | Group: ${result.group}`,
                    color: '#E6EDF3',
                    font: { size: 16, weight: '500' }
                  },
                  tooltip: {
                    callbacks: {
                      title: (context) => {
                        const pos = context[0].label;
                        const base = chrom.baseCalls[pos - 1];
                        return `Position ${pos} (${base})`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    title: { display: true, text: 'Position in Target Region', color: '#E6EDF3' },
                    ticks: {
                      callback: function(value, index) {
                        const label = interpolatedLabels[index];
                        // Only show integer position labels
                        if (label.toString().includes('.')) return '';
                        return label;
                      },
                      color: (context) => {
                        const label = interpolatedLabels[context.index];
                        const pos = parseInt(label);
                        return chrom.targetPositions.includes(pos) ? '#FFD700' : '#A8B2D1';
                      },
                      font: (context) => {
                        const label = interpolatedLabels[context.index];
                        const pos = parseInt(label);
                        return {
                          weight: chrom.targetPositions.includes(pos) ? 'bold' : 'normal',
                          size: chrom.targetPositions.includes(pos) ? 13 : 11
                        };
                      }
                    },
                    grid: { color: 'rgba(107, 155, 209, 0.1)' }
                  },
                  y: {
                    beginAtZero: true,
                    max: maxTrace * 1.1,
                    title: { display: true, text: 'Peak Intensity', color: '#E6EDF3' },
                    ticks: { color: '#A8B2D1' },
                    grid: { color: 'rgba(107, 155, 209, 0.1)' }
                  }
                }
              };

              return (
                <div key={idx} style={{
                  backgroundColor: '#252733',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(107, 155, 209, 0.3)'
                }}>
                  <Line data={chromData} options={chromOptions} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {processingStatus && (
        <p style={{
          color: '#6B9BD1',
          marginTop: '1rem',
          fontSize: '0.95rem'
        }}>
          {processingStatus}
        </p>
      )}
      {error && (
        <div style={{
          color: '#FF6B6B',
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          borderRadius: '6px'
        }}>
          {error}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default WebRAnalysis;
