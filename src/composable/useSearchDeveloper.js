import sortBy from "lodash/sortBy";
import Searcher from "@/util/Searcher";
import store from "../store/store";

const developerSearcher = new Searcher().setField("name").setField("login");

export function useSearchDeveloper() {
  function searchPopular(searchTerm) {
    let developers = store.state.Developers.developers;
    developerSearcher.setData(developers);

    if (searchTerm) {
      developers = developerSearcher.findAll(searchTerm);
    }

    return developers.slice(0, 10);
  }

  function searchNewDevelopers(searchTerm) {
    let developers = store.getters["Developers/newDevelopers"];
    developerSearcher.setData(developers);

    if (searchTerm) {
      developers = sortBy(developerSearcher.findAll(searchTerm), dev => -Number(new Date(dev.createdAt)));
    }

    return developers.slice(0, 10);
  }

  return { searchPopular, searchNewDevelopers };
}
