import Build from "../entities/build/buildInterface";

export default abstract class BuildDatasource{
    async save(build : Build) : Promise<void> {}
}