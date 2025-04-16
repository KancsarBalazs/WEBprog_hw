class Character {
    constructor(name, role) {
      this.name = name;
      this.role = role;
    }
  
    describe() {
      return `${this.name} egy ${this.role}.`;
    }
  
    createCard() {
      const card = document.createElement('div');
      card.className = 'character';
  
      const title = document.createElement('h2');
      title.textContent = this.name;
  
      const role = document.createElement('p');
      role.textContent = this.describe();
  
      card.appendChild(title);
      card.appendChild(role);
  
      document.body.appendChild(card);
    }
  }
  
  class Hero extends Character {
    constructor(name, role, power) {
      super(name, role);
      this.power = power;
    }
  
    describe() {
      return `${super.describe()} Különleges képessége: ${this.power}.`;
    }
  }
  
  const sampleData = [
    new Hero("Lili", "Harcos", "Tűzgolyó"),
    new Hero("Balázs", "Íjász", "Gyors lövés"),
    new Hero("Mira", "Varázsló", "Jégvihar"),
    new Hero("Dávid", "Lovag", "Pajzstörés"),
  ];
  
  let index = 0;
  
  function addCharacter() {
    if (index < sampleData.length) {
      sampleData[index].createCard();
      index++;
    } else {
      alert("Nincs több karakter!");
    }
  }
  