let recipes = []; // array to store recipes

const recipeForm = document.getElementById('recipeForm');
const recipeList = document.getElementById('recipeList');

const nameInput = document.getElementById('recipeName');
const ingredientsInput = document.getElementById('recipeIngredients');
const stepsInput = document.getElementById('recipeSteps');

// Add Recipe
recipeForm.addEventListener('submit', e => {
  e.preventDefault();
  const recipe = {
    id: Date.now(),
    name: nameInput.value.trim(),
    ingredients: ingredientsInput.value.split(',').map(i => i.trim()),
    steps: stepsInput.value.split(',').map(s => s.trim())
  };
  recipes.push(recipe);
  recipeForm.reset();
  renderRecipes();
});

// Render Recipes
function renderRecipes() {
  recipeList.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';

    card.innerHTML = `
      <div class="view-mode">
        <h3>${recipe.name}</h3>
        <h4>Ingredients:</h4>
        <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        <h4>Steps:</h4>
        <ul>${recipe.steps.map(s => `<li>${s}</li>`).join('')}</ul>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
      <div class="edit-mode" style="display:none;">
        <input type="text" class="edit-name" value="${recipe.name}">
        <textarea class="edit-ingredients">${recipe.ingredients.join(', ')}</textarea>
        <textarea class="edit-steps">${recipe.steps.join(', ')}</textarea>
        <button class="save-btn">Save</button>
        <button class="cancel-btn">Cancel</button>
      </div>
    `;

    // Buttons
    const editBtn = card.querySelector('.edit-btn');
    const deleteBtn = card.querySelector('.delete-btn');
    const saveBtn = card.querySelector('.save-btn');
    const cancelBtn = card.querySelector('.cancel-btn');

    const viewMode = card.querySelector('.view-mode');
    const editMode = card.querySelector('.edit-mode');

    editBtn.addEventListener('click', () => {
      viewMode.style.display = 'none';
      editMode.style.display = 'block';
    });

    cancelBtn.addEventListener('click', () => {
      editMode.style.display = 'none';
      viewMode.style.display = 'block';
    });

    saveBtn.addEventListener('click', () => {
      recipe.name = card.querySelector('.edit-name').value.trim();
      recipe.ingredients = card.querySelector('.edit-ingredients').value.split(',').map(i => i.trim());
      recipe.steps = card.querySelector('.edit-steps').value.split(',').map(s => s.trim());
      renderRecipes();
    });

    deleteBtn.addEventListener('click', () => {
      recipes = recipes.filter(r => r.id !== recipe.id);
      renderRecipes();
    });

    recipeList.appendChild(card);
  });
}
