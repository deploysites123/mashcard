import { SpreadsheetReloadViaId, SpreadsheetUpdateNameViaIdPayload } from '../events'
import { ColumnId, EventDependency, NamespaceId, SpreadsheetId, uuid, VariableDisplayData } from '../types'
import { CellType, SpreadsheetType, Cell } from './types'

export class CellClass implements CellType {
  namespaceId: NamespaceId
  spreadsheetId: SpreadsheetId
  cellId: uuid
  columnId: ColumnId
  rowId: uuid
  columnIndex: number
  rowIndex: number
  value: string
  displayData: VariableDisplayData | undefined

  spreadsheet: SpreadsheetType
  columnKey: string
  rowKey: string
  cleanupEventDependency: EventDependency<SpreadsheetUpdateNameViaIdPayload>

  constructor(
    spreadsheet: SpreadsheetType,
    { namespaceId, spreadsheetId, cellId, columnId, rowId, columnIndex, rowIndex, value, displayData }: Cell,
    {
      columnKey,
      rowKey,
      cleanupEventDependency
    }: { columnKey: string; rowKey: string; cleanupEventDependency: EventDependency<SpreadsheetUpdateNameViaIdPayload> }
  ) {
    this.namespaceId = namespaceId
    this.spreadsheetId = spreadsheetId
    this.rowId = rowId
    this.rowIndex = rowIndex
    this.cellId = cellId
    this.value = value
    this.columnId = columnId
    this.columnIndex = columnIndex
    this.displayData = displayData

    this.spreadsheet = spreadsheet

    this.columnKey = columnKey
    this.rowKey = rowKey
    this.cleanupEventDependency = cleanupEventDependency
  }

  eventDependency(): EventDependency<SpreadsheetUpdateNameViaIdPayload> {
    return {
      kind: 'Cell',
      event: SpreadsheetReloadViaId,
      key: `${this.cleanupEventDependency.kind}#Cell#${this.spreadsheetId}#${this.columnKey}#${this.rowKey}`,
      eventId: `${this.namespaceId},${this.spreadsheetId}`,
      scope: { rows: [this.rowKey], columns: [this.columnKey] },
      cleanup: this.cleanupEventDependency
    }
  }
}