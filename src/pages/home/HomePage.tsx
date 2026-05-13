import { Footer } from "../../widgets/Footer/Footer";
import { FiltersBar } from "../../widgets/FiltersBar/FiltersBar";
import { useSelector } from "../../app/store";
import { selectFilteredSkillCards } from "../../features/skills/selectors";
import { selectActiveFilterValues } from "../../features/filters/filtersSlice";
import { selectActiveFilterLabels } from "../../features/filters/selectors";

const HomePage = () => {
  const filteredCards = useSelector(selectFilteredSkillCards);
  console.log(filteredCards);

  const activeFilterValue = useSelector(selectActiveFilterValues)
  console.log(activeFilterValue)

  const activeFilterLabels = useSelector(selectActiveFilterLabels);
  console.log(activeFilterLabels);

  return (
    <>
      <h1>Catalog</h1>

      <FiltersBar/>

      <Footer/>
    </>
  );
};

export default HomePage;
