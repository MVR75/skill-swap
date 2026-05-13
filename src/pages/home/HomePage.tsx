import { FiltersBar } from "../../widgets/FiltersBar/FiltersBar";
import { useSelector } from "../../app/store";
import { selectFilteredSkillCards } from "../../features/skills/selectors";

const HomePage = () => {
  const filteredCards = useSelector(selectFilteredSkillCards);

  return (
    <>
      <h1>Catalog</h1>
      <FiltersBar/>
    </>
  );
};

export default HomePage;
