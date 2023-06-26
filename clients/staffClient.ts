import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
import { error } from "console";

const cookies = new Cookies();

interface StaffCredentials {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password2: string;
  employee_number: number | undefined;
  department: string;
  title: string;
  education_background: string;
}

interface StaffLogin {
  email: string;
  password: string;
}

export const checkAuth = createAsyncThunk("checkAuth", async (_, thunkAPI) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/staff/check_auth`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
    }
  );
  const data = await res.json();

  if (res.status === 200) {
    const { dispatch } = thunkAPI;

    //dispatch(userDashboard());

    return data;
  } else {
    return thunkAPI.rejectWithValue(data);
  }
});

export const registerStaff = createAsyncThunk(
  "registerStaff",
  async (credentials: StaffCredentials) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/staff/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      }
    );
    // Throw an error if the response is not successful
    if (!res.ok) {
      throw new Error("Failed to register user");
    }

    return await res.json();
  }
);

export const getStaffCsrfToken = createAsyncThunk(
  "getStaffCsrfToken",
  async (_, thunkAPI) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/staff/csrf_cookie`,
      {
        credentials: "include",
      }
    );
    console.log(res);

    return await res.json();
  }
);

export const loginStaff = createAsyncThunk(
  "loginStaff",
  async (credentials: StaffLogin) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/staff/login`,

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
    if (!res.ok) {
      throw new Error("Failed to login user");
    } else {
      //session_cookie = response.coo
    }

    return await res.json();
  }
);

export async function staffDashboard() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/staff/get_user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "include",
    }
  );
  //const data = await res.json();

  return await res.json();
}

export const logoutStaff = createAsyncThunk("logoutStaff", async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/staff/logout`,

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



interface updateCredentials {
  first_name: undefined;
  last_name: undefined;
  username: undefined;
  email: undefined;
  employee_number: number | undefined;
  department: undefined;
  title: undefined;
  education_background: undefined;
}

export const updateStaff = createAsyncThunk(
  "updateStaff",
  async (credentials: updateCredentials) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/staff/update`,

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
  isStaffRegistered: boolean;
  isStaffAuthenticated: boolean;
  staff: string | null;
  data: string | null;
}

const initialState: AuthState = {
  status: "idle",
  msg: null,
  error: null,
  csrfToken: null,
  staff: null,
  isStaffRegistered: false,
  isStaffAuthenticated: false,
  session: null,
  data: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staff = action.payload;
        state.isStaffRegistered = true;
      })
      .addCase(registerStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "failed";
        state.isStaffRegistered = false;
      })
      //**********************Get CSRFToken from the server*/
      .addCase(getStaffCsrfToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStaffCsrfToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.csrfToken = action.payload;
      })
      .addCase(getStaffCsrfToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to get csrfToken";
      })
      //**********************SignIn / Login the user */
      .addCase(loginStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isStaffAuthenticated = true;
        state.isStaffRegistered = true;
        state.csrfToken = action.payload;
        state.staff = action.payload.user;
      })
      .addCase(loginStaff.rejected, (state, action) => {
        state.status = "failed";
        state.isStaffAuthenticated = false;
        state.error = action.error.message ?? "Failed to login user";
        toast.error("Failed to login");
      })
      //************************Check User Authentication Status */
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staff = action.payload.user;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.status = "failed";
        state.isStaffAuthenticated = false;
        state.error = action.error.message ?? "Failed to set csrfToken";
      })
      //***********************Logout the user */
      .addCase(logoutStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutStaff.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isStaffAuthenticated = false;
        state.staff = action.payload.user;
      })
      .addCase(logoutStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to logout user";
      })
      .addCase(updateStaff.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.staff = action.payload.user;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to update user";
      })
      ;
  },
});

export default staffSlice.reducer;
