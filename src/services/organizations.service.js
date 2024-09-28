import {
    v1 as randomId,
    v4
} from "uuid";

import {
    Organizations
} from "../models/organizations.model.js";

export const createOrganization = async () => {
    let data = {}
    data._id = randomId();
    data.organizationKey = v4();
    const organization = new Organizations(data);
    await organization.save();
    return organization;
};
export const getOrganizationById = async (organizationId) => {
    let data = await Organizations.findOne({
        _id: organizationId
    });
    return data
};
export const getOrganizationByKey = async (organizationKey) => {
    let data = await Organizations.findOne({
        organizationKey
    });
    return data
};