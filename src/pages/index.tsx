import { useContext } from "react";
import { DataContext } from "../store/GlobalState";

const Index: React.FC = () => {
  const { state } = useContext(DataContext);
  return <>{JSON.stringify(state)}</>;
};

export default Index;
