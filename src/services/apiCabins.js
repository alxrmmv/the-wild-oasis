import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins can't be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Can't delete the cabin");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImageURL = newCabin.image?.startsWith?.(supabaseUrl);
  // console.log(hasImageURL);
  // https://upfcvvoukhocxktubwtu.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  const imageName = `${Math.random()}-${newCabin.image.name?.replace(
    "/",
    "_"
  )}`;

  const imagePath = hasImageURL
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //1. Create a cabin
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }
  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Can't create/update the cabin");
  }

  //2. Upload an image
  if (hasImageURL) return;
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Delete the cabin if there was an error uplading an image

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Can't upload the image");
    //   // Handle error
    // } else {
    //   // Handle success
    // }
  }

  return data;
}
