import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabbin-images/${imageName}`;

  //1. Create/edit cabins
  let query = supabase.from("cabins");

  //A) CREATE
  if (!id) await query.insert([{ ...newCabin, image: imagePath }]);

  //B) EDIT
  if (id) await query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }

  //2. Upload Image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabbin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error);
    throw new Error(
      "Cabin image could not be upload and the cabin was not created"
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
