import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import CreateProject from "@/pages/CreateProject";
import ProjectEdit from "@/pages/ProjectEdit";
import DataParsing from "@/pages/DataParsing";
import Generating from "@/pages/Generating";
import MatrixResult from "@/pages/MatrixResult";
import MatrixEdit from "@/pages/MatrixEdit";
import IndicatorSetConfig from "@/pages/IndicatorSetConfig";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<ProjectEdit />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/data-parsing" element={<DataParsing />} />
          <Route path="/generating" element={<Generating />} />
          <Route path="/matrix-result" element={<MatrixResult />} />
          <Route path="/matrix-edit" element={<MatrixEdit />} />
          <Route path="/indicator-set-config" element={<IndicatorSetConfig />} />
        </Routes>
      </Layout>
    </Router>
  );
}
