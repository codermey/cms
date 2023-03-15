export interface IContentConfig {
  pageName: string
  header: {
    title: string
    btnText: string
  }
  tableList: ITableItem[]
  childrenTree?: any
}

interface ITableItem {
  type?: string
  label: string
  width?: string
  prop?: string
  slotName?: string
}
