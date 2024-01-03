import { GraphEdge } from './graph_edge'
import { GraphNode } from './graph_node'

export interface Graph {
  nodes: GraphNode[]
  edges: GraphEdge[]
}
