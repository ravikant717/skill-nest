const DebugInfo = ({ title, data }) => {
  if (import.meta.env.MODE !== "development") return null;
  
  return (
    <div style={{
      position: "fixed",
      bottom: "10px",
      left: "10px",
      background: "rgba(0,0,0,0.8)",
      color: "white",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "12px",
      maxWidth: "300px",
      zIndex: 9999
    }}>
      <strong>{title}:</strong>
      <pre style={{ fontSize: "10px", marginTop: "5px" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default DebugInfo;
