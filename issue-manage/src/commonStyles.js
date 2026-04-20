const commonStyles = {
  container:{
    display:"flex",
    height:"100vh",
    fontFamily:"Segoe UI",
    background:"#f1f5f9"
  },

  sidebar:{
    width:"250px",
    background:"linear-gradient(180deg,#0f172a,#1e293b)",
    color:"white",
    padding:"20px",
    display:"flex",
    flexDirection:"column"
  },

  logo:{
    fontSize:"20px",
    fontWeight:"bold",
    marginBottom:"25px"
  },

  menu:{
    listStyle:"none",
    padding:0
  },

  item:{
    padding:"12px 14px",
    borderRadius:"8px",
    marginBottom:"10px",
    cursor:"pointer",  // ✅ FIX CURSOR HERE
    color:"#cbd5f1",
    userSelect:"none", // ✅ PREVENT TEXT CURSOR
    transition:"0.3s"
  },

  active:{
    background:"#2563eb",
    color:"white",
    padding:"12px 14px",
    borderRadius:"8px",
    marginBottom:"10px",
    cursor:"pointer",
    userSelect:"none",
    boxShadow:"0 0 10px rgba(37,99,235,0.7)"
  },

  main:{
    flex:1,
    padding:"25px",
    overflow:"auto"
  }
};

export default commonStyles;