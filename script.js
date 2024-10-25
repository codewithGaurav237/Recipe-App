const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipedetailscontent = document.querySelector('.recipe-Details-content')
const recipeclosebtn = document.querySelector('.recipe-close-btn')

fetchRecipes = async (query) => {
    recipeContainer.innerHTML = '<h2>fetching recipes....</h2>';
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipeContainer.innerHTML = '';

        console.log(response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML =
                `<img src = "${meal.strMealThumb}">
         <h3>${meal.strMeal}</h3> 
         <p>${meal.strArea}</p> 
         <p>${meal.strCategory}</p>
        `
            const button = document.createElement('button');
            button.textContent = 'View Recipe';
            recipeDiv.appendChild(button);

            button.addEventListener('click', () => {
                openRecipepopup(meal);
            })
            recipeContainer.appendChild(recipeDiv);
        }
        ));
    } catch (error) {
        recipeContainer.innerHTML = '<h2> Erorr in fetching recipes....</h2>';
    }
}

const fetchIngredients = (meal) => {
    let ingredientslist = "";
    for (let i = 1; 1 <= 20; i++) {
        const ingredients = meal[`strIngredient${i}`];
        if (ingredients) {
            const measure = meal[`strMeasure${i}`];
            ingredientslist += `<li>${measure} ${ingredients}</li>`
        } else {
            break;
        }
    }
    return ingredientslist;
}


const openRecipepopup = (meal) => {
    recipedetailscontent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
    <div class="instructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</P>
    </div>
    `
    recipedetailscontent.parentElement.style.display = "block";
}

recipeclosebtn.addEventListener('click', () => {
    recipedetailscontent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search Box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
})
