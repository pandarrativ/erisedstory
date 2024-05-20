declare class DBConnector {
    private dbUri;
    constructor(dbUri: string | undefined);
    connect(): Promise<void>;
}
export default DBConnector;
