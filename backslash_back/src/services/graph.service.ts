import { Graph } from 'db/entities/graph'
import { GraphEdge } from 'db/entities/graph_edge'
import { GraphNode } from 'db/entities/graph_node'
import _ from 'lodash'

export const filterGraphTopToBottom = (graph: Graph, initialNodes: GraphNode[]): Graph => {
  const filteredNodes: GraphNode[] = _.cloneDeep(initialNodes)
  const filteredEdges: GraphEdge[] = []
  let index = 0
  while (index < filteredNodes.length) {
    for (const edge of graph.edges) {
      if (edge.from === filteredNodes[index].name) {
        const newNodes: GraphNode[] = []
        for (const nodeName of edge.to) {
          const node = graph.nodes.find((node) => node.name === nodeName)
          if (node) {
            newNodes.push(node)
          }
        }
        filteredNodes.push(..._.cloneDeep(newNodes))
        filteredEdges.push(_.cloneDeep(edge))
      }
    }
    index++
  }

  return { nodes: filteredNodes, edges: filteredEdges }
}

export const filterGraphBottomToTop = (graph: Graph, initialNodes: GraphNode[]): Graph => {
  const filteredNodes: GraphNode[] = _.cloneDeep(initialNodes)
  const filteredEdges: GraphEdge[] = []
  let index = 0
  while (index < filteredNodes.length) {
    for (const edge of graph.edges) {
      if (edge.to.includes(filteredNodes[index].name)) {
        const fromNode = graph.nodes.find((node) => node.name === edge.from)
        if (fromNode) {
          filteredNodes.push(_.cloneDeep(fromNode))
          filteredEdges.push(_.cloneDeep(edge))
        }
      }
    }
    index++
  }

  return { nodes: filteredNodes, edges: filteredEdges }
}
