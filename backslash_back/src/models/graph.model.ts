import _ from 'lodash'

import { Graph } from '@db/entities/graph'
import { GraphNode } from '@db/entities/graph_node'
import graph from '@db/train-ticket-be.json'
import { FilterBy } from '@my-types/common'
import { graphService } from '@services/index'

export const graphModel = {
  getGraph: (filterBy: FilterBy[]): Graph => {
    let filteredGraph = _.cloneDeep(graph) as Graph

    for (const filterByItem of filterBy) {
      let initialNodes: GraphNode[] = []

      switch (filterByItem) {
        case FilterBy.IsPubliclyExposed:
          initialNodes = filteredGraph.nodes.filter((node) => node.publicExposed)

          filteredGraph = graphService.filterGraphTopToBottom(filteredGraph, initialNodes)
          break
        case FilterBy.SinkRoutes:
          initialNodes = filteredGraph.nodes.filter((node) => node.kind === 'sqs' || node.kind === 'rds')

          filteredGraph = graphService.filterGraphBottomToTop(filteredGraph, initialNodes)
          break
        case FilterBy.HasVulnerability:
          initialNodes = filteredGraph.nodes.filter((node) => node.vulnerabilities && node.vulnerabilities.length > 0)
          const partlyFilteredGraph1 = graphService.filterGraphTopToBottom(filteredGraph, initialNodes)
          const partlyFilteredGraph2 = graphService.filterGraphBottomToTop(filteredGraph, initialNodes)
          filteredGraph.nodes = [...partlyFilteredGraph1.nodes, ...partlyFilteredGraph2.nodes]
          filteredGraph.edges = [...partlyFilteredGraph1.edges, ...partlyFilteredGraph2.edges]
          break
        default:
          break
      }

      filteredGraph.nodes = _.uniqBy(filteredGraph.nodes, (node) => node.name)
      filteredGraph.edges = _.uniqBy(filteredGraph.edges, (edge) => edge.from)
    }
    return filteredGraph
  }
}
