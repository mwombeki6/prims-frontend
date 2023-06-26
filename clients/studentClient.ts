import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface StudentCredentials {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password2: string;
  class_course: string;
  department: string;
  student_reg_no: number | undefined;
}

interface StudentLogin {
  email: string;
  password: string;
}

interface InnovationUpload {
  innovation_name: string;
  abstract: string;
  category: string;
}

export const checkAuth = createAsyncThunk("checkAuth", async (_, thunkAPI) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/student/check_auth`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
    }
  );
  const data = await res.json();

  return data;
});

export const registerStudent = createAsyncThunk(
  "registerStudent",
  async (credentials: StudentCredentials, thunkAPI) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/student/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );

    // Throw an error if the response is not successful
    if (!response.ok) {
      throw new Error("Failed to register user");
    }

    // Return the JSON data as the payload of the action
    const data = await response.json();
    return data;
  }
);

export const getStudentCsrfToken = createAsyncThunk(
  "getCsrfToken",
  async (_, thunkAPI) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/student/csrf_cookie`,
      {
        credentials: "include",
      }
    );
    console.log(res);

    return await res.json();
  }
);

export const loginStudent = createAsyncThunk(
  "loginUser",
  async (credentials: StudentLogin) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/student/login`,

      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      }
    );
    // Throw an error if the response is not successful
    if (!response.ok) {
      throw new Error("Failed to login user");
    } else {
      //session_cookie = response.coo
    }

    // Return the JSON data as the payload of the action
    const data = await response.json();
    return data;
  }
);

export async function studentDashboard() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/student/get_user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "include",
    }
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
}

export const logoutStudent = createAsyncThunk("logoutUser", async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/student/logout`,

    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "include",
    }
  );
  toast.success(`Successfully loged out`);
  return await res.json();
});

export const uploadInnovation = createAsyncThunk(
  "uploadInnovation",
  async (credentials: InnovationUpload) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/innovation/upload-innovation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to upload innovation");
    }
    return await response.json();
  }
);

interface updateCredentials {
  first_name: undefined;
  last_name: undefined;
  username: undefined;
  email: undefined;
  student_reg: number | undefined;
  department: undefined;
  class_course: undefined;
}

export const updateStudent = createAsyncThunk(
  "updateStaff",
  async (credentials: updateCredentials) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/student/update`,

      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": cookies.get("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      }
    );
    toast.success(`Account updated successfully`);
    return await res.json();
  }
);


interface AuthState {
  status: string;
  msg: string | null;
  error: string | null;
  csrfToken: string | null;
  session: string | null;
  isStudentRegistered: boolean;
  isStudentAuthenticated: boolean;
  innovationUploaded: boolean;
  student: string | null;
}

const initialState: AuthState = {
  status: "idle",
  msg: null,
  error: null,
  csrfToken: null,
  isStudentRegistered: false,
  isStudentAuthenticated: false,
  innovationUploaded: false,
  student: null,
  session: cookies.get("sessionid") || null,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload;
        state.isStudentRegistered = true;
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to register user";
      })
      //**********************Get CSRFToken from the server*/
      .addCase(getStudentCsrfToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudentCsrfToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.csrfToken = action.payload;
      })
      .addCase(getStudentCsrfToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to get csrfToken";
      })
      //**********************SignIn / Login the user */
      .addCase(loginStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isStudentAuthenticated = true;
        state.csrfToken = action.payload.csrfToken;
        state.student = action.payload.student;
        state.isStudentRegistered = true;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.status = "failed";
        state.isStudentAuthenticated = false;
        state.error = action.error.message ?? "Failed to login user";
        toast.error("Failed to login");
      })
      /***********************User Dashboard 
      .addCase(studentDashboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(studentDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isStudentAuthenticated = true;
        state.isStudentRegistered = true;
        state.student = action.payload.student;
      })
      .addCase(studentDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.isStudentAuthenticated = false;
        state.error = action.error.message ?? "Failed to load user dashboard";
      })*/
      //************************Check User Authentication Status */
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.student = action.payload.student;
        state.isStudentAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.isStudentAuthenticated = false;
        state.error =
          action.error.message ?? "Failed to check for user authentication";
      })
      //***********************Logout the user */
      .addCase(logoutStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isStudentAuthenticated = false;
        state.student = action.payload.student;
      })
      .addCase(logoutStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to log out user";
      })
      .addCase(uploadInnovation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadInnovation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isStudentAuthenticated = true;
        state.innovationUploaded = true;

        toast.success('successfully uploaded')
      })
      .addCase(uploadInnovation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to upload innovation";
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.student = action.payload.user;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update user";
      });
  },
});

export default studentSlice.reducer;
