/**
 * Diagrams Template - Graphviz DOT Definitions
 * Use this file to create diagrams with the Viz.js library
 * 
 * REQUIRED: Load these scripts in your HTML:
 * <script src="https://unpkg.com/viz.js@2.1.2/viz.js"></script>
 * <script src="https://unpkg.com/viz.js@2.1.2/full.render.js"></script>
 */

// =============================================
// EXAMPLE 1: Simple Flow Diagram
// CUSTOMIZE: Change the nodes and edges
// =============================================
const exampleFlowDiagram = `
digraph FlowChart {
    graph [
        bgcolor="transparent",
        fontcolor="#e6edf3",
        rankdir=TB,
        nodesep=0.5,
        ranksep=0.6
    ];

    node [
        shape=box,
        fontsize=14,
        fontname="JetBrains Mono, monospace",
        color="#30363d",
        fontcolor="#e6edf3",
        style="filled,rounded",
        fillcolor="#21262d",
        margin="0.15,0.1"
    ];
    
    edge [
        color="#58a6ff",
        fontcolor="#8b949e",
        fontsize=11
    ];

    // CUSTOMIZE: Define nodes
    start [label="Start", fillcolor="#1a3d1a", color="#22c55e"];
    step1 [label="Step 1"];
    step2 [label="Step 2"];
    decision [label="Decision?", shape=diamond, fillcolor="#3d1f5c", color="#a855f7"];
    step3 [label="Step 3"];
    end [label="End", fillcolor="#1a3d1a", color="#22c55e"];

    // CUSTOMIZE: Edges/connections
    start -> step1;
    step1 -> step2;
    step2 -> decision;
    decision -> step3 [label="Yes"];
    decision -> end [label="No"];
    step3 -> end;
}
`;

// =============================================
// EXAMPLE 2: Tree Structure (Parse Tree)
// CUSTOMIZE: Change the nodes and structure
// =============================================
const exampleTreeDiagram = `
digraph TreeExample {
    graph [
        bgcolor="transparent",
        fontcolor="#e6edf3",
        rankdir=TB,
        nodesep=0.5,
        ranksep=0.6,
        ordering=out
    ];

    node [
        shape=circle,
        fixedsize=true,
        width=0.5,
        fontsize=14,
        fontname="JetBrains Mono, monospace",
        color="#30363d",
        fontcolor="#e6edf3",
        style=filled,
        fillcolor="#21262d"
    ];
    
    edge [
        color="#58a6ff",
        arrowhead=none
    ];

    // CUSTOMIZE: Non-terminal nodes (purple)
    root [label="S", fillcolor="#3d1f5c", color="#a855f7"];
    child1 [label="A", fillcolor="#3d1f5c", color="#a855f7"];
    child2 [label="B", fillcolor="#3d1f5c", color="#a855f7"];
    
    // CUSTOMIZE: Terminal nodes (green, square)
    leaf1 [label="a", shape=box, fillcolor="#1a3d1a", color="#22c55e", width=0.4, height=0.4];
    leaf2 [label="b", shape=box, fillcolor="#1a3d1a", color="#22c55e", width=0.4, height=0.4];
    leaf3 [label="c", shape=box, fillcolor="#1a3d1a", color="#22c55e", width=0.4, height=0.4];

    // CUSTOMIZE: Connect nodes
    root -> child1;
    root -> child2;
    child1 -> leaf1;
    child1 -> leaf2;
    child2 -> leaf3;
}
`;

// =============================================
// EXAMPLE 3: Automaton (NFA/DFA)
// CUSTOMIZE: Change states and transitions
// =============================================
const exampleAutomatonDiagram = `
digraph Automaton {
    graph [
        bgcolor="transparent",
        fontcolor="#e6edf3",
        rankdir=LR,
        nodesep=0.8,
        ranksep=1.0
    ];

    node [
        shape=circle,
        fixedsize=true,
        width=0.6,
        fontsize=14,
        fontname="JetBrains Mono, monospace",
        color="#30363d",
        fontcolor="#e6edf3",
        style=filled,
        fillcolor="#21262d"
    ];
    
    edge [
        color="#58a6ff",
        fontcolor="#e6edf3",
        fontsize=12
    ];

    // Initial arrow (invisible node)
    init [shape=point, width=0];
    
    // CUSTOMIZE: States
    q0 [label="q₀"];
    q1 [label="q₁"];
    q2 [label="q₂", shape=doublecircle, color="#22c55e"];  // Final state

    // CUSTOMIZE: Transitions
    init -> q0;
    q0 -> q1 [label="a"];
    q1 -> q1 [label="b"];
    q1 -> q2 [label="a"];
    q0 -> q2 [label="b"];
}
`;

// =============================================
// HELPER FUNCTION: Render diagram
// Use this function to display a diagram in a container
// =============================================
/**
 * Render a diagram into a container element
 * @param {string} containerId - The ID of the HTML element
 * @param {string} dotString - The DOT language string
 */
async function renderDiagram(containerId, dotString) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.warn(`Diagram container #${containerId} not found`);
        return;
    }

    // Loading message
    container.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: var(--space-lg);">Loading diagram...</p>';

    try {
        // Check if Viz library is loaded
        if (typeof Viz === 'undefined') {
            console.error('Viz.js not loaded');
            container.innerHTML = `
                <p style="color: var(--color-accent-warning); text-align: center;">
                    Error: Viz.js library not loaded.<br>
                    Add the scripts to your HTML.
                </p>
            `;
            return;
        }

        // Create and render the diagram
        const viz = new Viz();
        const svgElement = await viz.renderSVGElement(dotString);

        // Style the SVG
        svgElement.style.maxWidth = '100%';
        svgElement.style.height = 'auto';
        svgElement.style.display = 'block';
        svgElement.style.margin = '0 auto';

        // Display the diagram
        container.innerHTML = '';
        container.appendChild(svgElement);

    } catch (error) {
        console.error('Error rendering diagram:', error);
        container.innerHTML = `
            <p style="color: var(--color-accent-warning); text-align: center;">
                Error rendering the diagram.
            </p>
        `;
    }
}

// =============================================
// INITIALIZATION
// CUSTOMIZE: Add your own diagrams
// =============================================
function initDiagrams() {
    // CUSTOMIZE: Render each diagram to its container
    // The container ID must exist in your HTML

    if (document.getElementById('diagram-flow')) {
        renderDiagram('diagram-flow', exampleFlowDiagram);
    }

    if (document.getElementById('diagram-tree')) {
        renderDiagram('diagram-tree', exampleTreeDiagram);
    }

    if (document.getElementById('diagram-automaton')) {
        renderDiagram('diagram-automaton', exampleAutomatonDiagram);
    }
}

// =============================================
// EXPORTS
// Make functions available globally
// =============================================
window.initDiagrams = initDiagrams;
window.renderDiagram = renderDiagram;

// Optional: Export examples
window.exampleFlowDiagram = exampleFlowDiagram;
window.exampleTreeDiagram = exampleTreeDiagram;
window.exampleAutomatonDiagram = exampleAutomatonDiagram;

// =============================================
// USAGE IN HTML
// =============================================
/*
<!-- 1. Load libraries in <head> -->
<script src="https://unpkg.com/viz.js@2.1.2/viz.js"></script>
<script src="https://unpkg.com/viz.js@2.1.2/full.render.js"></script>
<script src="diagrams-template.js"></script>

<!-- 2. Container for the diagram -->
<div class="diagram-container" id="diagram-flow"></div>

<!-- 3. Initialize at end of body -->
<script>
    document.addEventListener('DOMContentLoaded', function() {
        initDiagrams();
    });
</script>
*/
