import BuildDatasource from "../dataSources/buildDatasource";
import Build from "../entities/build/buildInterface";
import firebase from 'firebase-admin';
import path from 'path';

export default class BuildRepository implements BuildDatasource{

    collection : FirebaseFirestore.CollectionReference;

    constructor(){
        const serviceAccount = require(path.resolve(__dirname,'..','..','..','auth.json'));
        firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
        });
        const db = firebase.firestore();
        this.collection = db.collection('builds');
    }

    async save(build: Build|undefined) : Promise<void>{
        if(build!=null && build.champion.name != null){
            await this.collection.doc(build.champion.name as string).set(build);
        }
    }
}