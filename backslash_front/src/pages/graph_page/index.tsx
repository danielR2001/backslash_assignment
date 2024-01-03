import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import dagre from 'dagre'
import React, { useEffect, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Edge,
  MarkerType,
  MiniMap,
  Node,
  Position,
  useEdgesState,
  useNodesState
} from 'reactflow'
import 'reactflow/dist/style.css'

import { FilterBy } from '@my-types/general.types'
import { useGraph } from '@queries/index'

import * as S from './styles'

interface NodeData {}

const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

const getLayoutedElements = (nodes: Node<NodeData>[], edges: Edge<NodeData>[]) => {
  dagreGraph.setGraph({ rankdir: 'TB' })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    node.targetPosition = Position.Top
    node.sourcePosition = Position.Bottom

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2
    }

    return node
  })

  return { nodes, edges }
}

const GraphPage: React.FC = () => {
  const [filterBy, setFilterBy] = useState<FilterBy[]>([])

  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([])
  const [edges, setEdges, onEdgesChange] = useEdgesState<NodeData>([])

  const { data: graph, refetch } = useGraph({ filterBy })

  useEffect(() => {
    refetch()
  }, [filterBy])

  useEffect(() => {
    if (!graph?.nodes || !graph.edges) {
      return
    }

    const nodes: Node<NodeData>[] = []
    for (const graphNode of graph.nodes ?? []) {
      nodes.push({
        id: graphNode.name,
        data: {
          label: graphNode.name
        },
        position: {
          x: 0,
          y: 0
        },
        deletable: false
      })
    }

    const edges: Edge[] = []

    for (const graphEdge of graph.edges ?? []) {
      const source = graphEdge.from
      for (const target of graphEdge.to) {
        edges.push({
          id: `${source}_${target}`,
          source,
          target,
          focusable: false,
          deletable: false,
          markerEnd: {
            type: MarkerType.Arrow
          }
        })
      }
    }

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges)

    setNodes(layoutedNodes)
    setEdges(layoutedEdges)
  }, [graph])

  const handleChange = (event: SelectChangeEvent<FilterBy[]>) => {
    const {
      target: { value }
    } = event
    setFilterBy((typeof value === 'string' ? value.split(',') : value) as FilterBy[])
  }

  return (
    <S.Page>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id='demo-multiple-name-label'>Filter</InputLabel>
        <Select multiple value={filterBy} onChange={handleChange} input={<OutlinedInput label='Name' />}>
          {Object.values(FilterBy).map((filter) => (
            <MenuItem key={filter} value={filter}>
              {filter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        zoomOnDoubleClick={false}
        zoomOnScroll={false}
        panOnScroll
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </S.Page>
  )
}

export default GraphPage
