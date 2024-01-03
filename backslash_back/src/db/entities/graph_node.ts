export interface GraphNode {
  name: string
  kind: string
  language?: string
  path?: string
  publicExposed?: boolean
  vulnerabilities?: {
    file?: string
    severity?: string
    message?: string
    metadata?: {
      cwe?: string
    }
  }[]
  metadata?: {
    cloud?: string
    engine?: string
    version?: string
  }
}
