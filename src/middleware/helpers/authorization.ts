import { getShopById } from "../../data/shop";
import type { ObjectId } from "mongoose";

type Identification = string | ObjectId;

/**
 * Returns true if the user is the owner of the shop.
 */
async function verifyShopOwner(userId: Identification, shopId: Identification): Promise<boolean> {
	if(typeof userId !== "string"){
		userId = userId.toString();
	}

	if(typeof shopId !== "string"){
		shopId = shopId.toString();
	}
  
	const shop = await getShopById(shopId);
  
	return shop?.owner.toString() === userId;
}

export { verifyShopOwner };