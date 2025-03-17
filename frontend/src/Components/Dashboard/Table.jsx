import React, {useState} from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from 'ag-grid-community';
import { useSelector, useDispatch } from "react-redux";

ModuleRegistry.registerModules([AllCommunityModule]);


const StatusCellRenderer = (props) => {
    const statusStyles = {
      Applied: {
        backgroundColor: "rgba(156, 157, 255, 0.2)",
        color: "#5e5fcc",
      },
      Interview: {
        backgroundColor: "rgba(255, 232, 156, 0.3)",
        color: "#a58400",
      },
      Updates: {
        backgroundColor: "rgba(255, 156, 183, 0.3)",
        color: "#c23e62",
      },
      "Follow Up": {
        backgroundColor: "rgba(94, 211, 182, 0.3)",
        color: "#2a7c67",
      },
      Close: {
        backgroundColor: "rgba(144, 202, 249, 0.3)",
        color: "#2962ff",
      },
    };
    
    // Get the style for the current status or use a default
    const style = statusStyles[props.value] || {
      color: "#757575",
    };
    
    return (
      <div
        style={{
          ...style,
          padding: "4px 12px",
          display: "flex",
        //   justifyContent: "center",
        //   alignContent: "center",
          fontWeight: "500",
          textAlign: "center",
          fontSize: "0.85rem",
          minWidth: "50px",
          marginLeft: "-12px"
        }}
      >
        {props.value}
      </div>
    );
  };

// const [todayDate, setTodayDate] = useState(`${formattedDate},${dayOfWeek}`)

const myTheme = themeQuartz
	.withParams({
        accentColor: "#000000",
        backgroundColor: "#FFFFFF",
        browserColorScheme: "light",
        columnBorder: false,
        foregroundColor: "#505050",
        headerBackgroundColor: "#FFFFFF",
        headerFontSize: 14,
        headerRowBorder: true,
        headerTextColor: "#6416ff",
        rowBorder: true,
        wrapperBorder: false
    });

const GridExample = () => {
    const dispach = useDispatch()
    const rowData = useSelector((state) => state.job.jobData)
  
    const [colDefs, setColDefs] = useState([
      { field: "DateApplied" },
      { field: "Title" },
      { field: "Company" },
      { field: "Status", cellRenderer: StatusCellRenderer, },
      { field: "Category" },
      { "" : "Close" },
    ]);
  
    const defaultColDef = {
      flex: 1,
    }
    return (
        <div style={{ width: "100%", height: "90%" }}>
          <AgGridReact
          theme={myTheme}
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultColDef}
          />
        </div>
      );
    };

export default GridExample