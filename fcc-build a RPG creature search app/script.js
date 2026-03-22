const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const creatureWeight = document.getElementById("weight");
const creatureHeight = document.getElementById("height");
const creatureTypes = document.getElementById("types");
const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const getCreatureData = async () => {
  try {
    const nameOrId = searchInput.value.toLowerCase();
    const res = await fetch(
      `https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`,
    );

    const data = await res.json();
    //console.log(data);
    setCreatureInfo(data);
  } catch (err) {
    alert("Creature not found");
    console.log(err);
  }
};

const setCreatureInfo = (data) => {
  const { id, name, weight, height, special, stats, types } = data;

  creatureName.textContent = `${name.toUpperCase()}`;
  creatureId.textContent = `#${id}`;
  creatureWeight.textContent = `Weight: ${weight}`;
  creatureHeight.textContent = `Height: ${height}`;
  specialName.textContent = `${special.name}`;
  specialDescription.textContent = `${special.description}`;

  hp.textContent = `${stats[0].base_stat}`;
  attack.textContent = `${stats[1].base_stat}`;
  defense.textContent = `${stats[2].base_stat}`;
  specialAttack.textContent = `${stats[3].base_stat}`;
  specialDefense.textContent = `${stats[4].base_stat}`;
  speed.textContent = `${stats[5].base_stat}`;

  creatureTypes.innerHTML = types.map(
    (type) => `<span class="type ${type.name}">${type.name}</span>`,
  );
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getCreatureData();
  searchInput.value = "";
});
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getCreatureData();
  }
});
