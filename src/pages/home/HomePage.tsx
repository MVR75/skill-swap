import { Footer } from "../../widgets/Footer/Footer";
import { FiltersBar } from "../../widgets/FiltersBar/FiltersBar";
import { useSelector } from "../../app/store";
import { selectFilteredSkillCards } from "../../features/skills/selectors";

const HomePage = () => {
  const filteredCards = useSelector(selectFilteredSkillCards);
  console.log(filteredCards);

  return (
    <>
      <h1>Catalog</h1>

      <FiltersBar/>

      <Footer/>
    </>
  );
};

export default HomePage;
