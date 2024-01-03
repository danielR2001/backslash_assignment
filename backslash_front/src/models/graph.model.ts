import { GraphEdge } from './graph_edge.model'
import { GraphNode } from './graph_node.model'

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
