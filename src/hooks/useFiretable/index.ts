import useTable from "./useTable";
import useTableConfig from "./useTableConfig";

export type FiretableActions = {
  column: {
    add: Function;
    resize: Function;
    rename: Function;
    remove: Function;
    update: Function;
    reorder: Function;
  };
  row: { add: any; delete: Function };
  table: {
    set: Function;
    filter: Function;
    updateConfig: Function;
  };
};

export type FiretableState = {
  config: { rowHeight: number };
  columns: any;
  rows: any;
  loadingRows: boolean;
  loadingColumns: boolean;
};
export type FireTableFilter = {
  key: string;
  operator: "==" | "<" | ">" | ">=" | "<=" | string;
  value: any;
};

const useFiretable = (collectionName: string) => {
  const [tableConfig, configActions] = useTableConfig(collectionName);
  const [tableState, tableActions] = useTable({
    path: collectionName,
  });

  const setTable = (collectionName: string, filters: FireTableFilter[]) => {
    configActions.setTable(collectionName);
    tableActions.setTable(collectionName, filters);
  };
  const filterTable = (filters: FireTableFilter[]) => {};

  const state: FiretableState = {
    columns: tableConfig.columns,
    config: { rowHeight: tableConfig.rowHeight },
    rows: tableState.rows,
    loadingRows: tableState.loading,
    loadingColumns: tableConfig.loading,
  };
  const actions: FiretableActions = {
    column: {
      add: configActions.add,
      resize: configActions.resize,
      rename: configActions.rename,
      update: configActions.updateColumn,
      remove: configActions.remove,
      reorder: configActions.reorder,
    },
    row: {
      add: tableActions.addRow,
      delete: tableActions.deleteRow,
    },
    table: {
      updateConfig: configActions.updateConfig,
      set: setTable,
      filter: filterTable,
    },
  };

  return { tableState: state, tableActions: actions };
};

export default useFiretable;
