import { List } from "immutable";

const mapJsonArrayToListOfRecords = (data, EntityRecord) => {
    const list = new List(data.map(item => (
        new EntityRecord({ ...item })
    )));
    return list;
};

export default mapJsonArrayToListOfRecords;