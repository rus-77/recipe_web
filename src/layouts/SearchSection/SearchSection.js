import React, { useEffect, useState } from "react";
import Searchbar from "../../components/Searchbar/Searchbar";
import Filters from "../../components/Filters/Filters";
import SearchResults from "../../components/SearchResults/SearchResults";
import { useSearchParams } from "react-router-dom";
import useFetchRecipes from "../../hooks/useFetchRecipes";
import { databases } from "./db_links";

const findRecipesForCurrentPage = (recipes, currentPage, recipesPerPage) => {
    let firstRecipeIndex = currentPage * recipesPerPage - recipesPerPage;
    let lastRecipeIndex = firstRecipeIndex + recipesPerPage;
    let recipesToShow = recipes.slice(firstRecipeIndex, lastRecipeIndex);
    return recipesToShow;
}

const SearchSection = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const recipes = useFetchRecipes(databases);
    const [currentPage, setCurrentPage] = useState(4);
    const [recipesPerPage, setRecipesPerPage] = useState(10);
    const currentPageRecipes = findRecipesForCurrentPage(recipes, currentPage, recipesPerPage);
    const pages = recipes.length / 10;

    return (
        <section className="search-section">
            <Filters setSearchParams={setSearchParams} />
            <div className="search-section__wrapper">
                <Searchbar />
                <SearchResults recipes={currentPageRecipes} />
            </div>
        </section>
    )
}

export default SearchSection;