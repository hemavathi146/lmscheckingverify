import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState("");

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function addNewPlace(ev) {
    ev.preventDefault();
    await axios.post("/places", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirect("/account/places");
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      {action !== "new" && (
        <div className="text-center ">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
            Add new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            {preInput("Title", "Title for your place")}
            <input
              type="text"
              value={title}
              onChange={(ev) => setTitle(ev.target.value)}
              placeholder="title, for example, 'My lovely appartment'"
            />
            {preInput("Address", "Address to your property")}
            <input
              type="text"
              value={address}
              onChange={(ev) => setAddress(ev.target.value)}
              placeholder="address"
            />

            {preInput("Photos", "more = better")}
            <PhotosUploader
              addedPhotos={addedPhotos}
              onChange={setAddedPhotos}
            />

            {preInput(
              "Description",
              "Add a description to give your property the perfect appeal."
            )}

            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />

            {preInput("Amenities", "What perks are provided at your property?")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Info", "House rules, etc.")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
            {preInput(
              "Additional Information",
              "Add additional details for guests"
            )}

            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-2">Check in Time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                  placeholder="16:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-2">Check in Out</h3>

                <input
                  type="text"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                  placeholder="10:00"
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-2">Max Guests</h3>

                <input
                  type="number"
                  value={maxGuests}
                  onChange={(ev) => setMaxGuests(ev.target.value)}
                  placeholder="1"
                />
              </div>
            </div>
            <div className="">
              <button className="primary my-4">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
