import React, { useEffect, useState } from "react";
import axios from "axios";

export const Inno = () => {
  const [file, setInnovationFile] = useState("");
  const [innovation_name, setInnovationName] = useState("");
  const [category_slug, setCategory] = useState("");
  const [updated, setUpdated] = useState(false);

  const onFileChange = (e: any) => setInnovationFile(e.target.files[0]);
  const onInnovationNameChange = (e: any) => setInnovationName(e.target.value);
  const onCategoryChange = (e: any) => setCategory(e.target.value);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    formData.append("innovation_file", file);
    formData.append("innovation_name", innovation_name);
    formData.append("category_slug", category_slug);

    const body = formData;

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/innovation/upload-innovation`,
        body,
        config
      );

      if (res.status === 201) {
        setUpdated(!updated);
      }
    } catch (err) {}
  };

  return (
    <div className="container mt-5">
      <h1 className="display-4 mt-5 mb-5">Image Upload Tutorial</h1>
      <div className="row">
        <div className="col-5">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="image">
                Image Upload
              </label>
              <input
                className="form-control"
                type="file"
                name="innovation_file"
                onChange={onFileChange}
                required
              />
            </div>
            <div className="form-group mt-3 space-y-5 flex-col flex">
              <label className="form-label" htmlFor="alt_text">
                details
              </label>
              <input
                className="form-control"
                type="text"
                name="category"
                onChange={onCategoryChange}
                value={category_slug}
                required
                placeholder="category"
              />
              <input
                className="form-control"
                type="text"
                name="innovation_name"
                onChange={onInnovationNameChange}
                value={innovation_name}
                required
                placeholder="innovation name"
              />
            </div>
            <button className="btn btn-success mt-3" type="submit">
              Upload Image
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
