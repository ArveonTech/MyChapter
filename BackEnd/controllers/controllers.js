const database = require("../config/db");

const loadDatabase = async (collection) => {
  try {
    const db = await database();
    const collectionData = await db.collection(collection).find().toArray();
    return collectionData;
  } catch (error) {
    console.info(`Gagal load database ${error.message}`);
  }
};

const validationSigIn = () => {
  
} 

const validationSignUp = () => {

}

const saveNotes = async (collectionsData) => {
  try {
    const db = await database();
    await db.collection("notes").insertOne(collectionsData);
  } catch (error) {
    console.info(`Gagal save notes ${error.message}`);
  }
};

const addNotes = async (dataForm) => {
  try {
    const colletionsNotes = await loadDatabase("notes");
    colletionsNotes.push(dataForm);
    saveNotes(colletionsNotes);
  } catch (error) {
    console.info(`Gagal Add notes ${error.message}`);
  }
};
