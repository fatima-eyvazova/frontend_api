import {
    getOrganizationByKey
} from "../services/organizations.service.js";
import {
    getSuperAdminByKeyId
} from "../services/users.service.js";
import {
    catcher
} from "../utils/catcher.utils.js";

export const keyChecker = catcher(async (req, res, next) => {
    const {
        organizationKey
    } = req.params
   

    const organization = await getOrganizationByKey(organizationKey)
    if (!organization) {
        throw new Error("Invalid api key")
    }

   
    const admin = await getSuperAdminByKeyId(organization._id)
    if (!admin) {
        throw new Error("No users were found matching this key")
    }
    req.organizationId = organization._id
    next()
});