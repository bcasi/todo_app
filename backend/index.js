const express = require("express");
const { supabase } = require("./db");
const cors = require("cors");
const { todoSchema, updateTodoSchema } = require("./types");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.json());

// app.post("/createTodo", async (req, res) => {
//   const validate = todoSchema.safeParse(req.body);

//   console.log(validate);

//   const { data, error } = await supabase.from("todo").insert([
//     {
//       title: "learn express",
//       description: "Learn fullstack",
//     },
//   ]);

//   console.log(data);
//   // console.log(error);
//   const getTodo = await supabase.from("todo").select("*");
//   console.log(getTodo);
//   // if (data) {
//   //   const getTodo = await supabase.from("todo").select("*");
//   //   res.json(getTodo);
//   // }
//   if (error) {
//     res.status(411).json({ msg: "some error occurred" });
//   }
// });

app.post("/createTodo", async (req, res) => {
  // Validate request body with Zod
  const validate = todoSchema.safeParse(req.body.formData);

  if (!validate.success) {
    return res.status(400).json({ errors: validate.error.errors });
  }
  console.log(req.body.formData);
  console.log(validate.data);
  try {
    // Use validated data instead of hard-coded values
    const { data, error } = await supabase.from("todo").insert([validate.data]);

    if (error) {
      return res
        .status(500)
        .json({ msg: "Insert failed", error: error.message });
    }

    // Fetch updated list
    const { data: todos, error: fetchError } = await supabase
      .from("todo")
      .select("*");
    console.log(todos);

    if (fetchError) {
      return res
        .status(500)
        .json({ msg: "Fetch failed", error: fetchError.message });
    }

    return res.json(todos);
  } catch (err) {
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
});

app.get("/todo", async (req, res) => {
  const getTodo = await supabase.from("todo").select("*");
  res.json(getTodo);
});

app.put("/updateTodo", async (req, res) => {
  console.log("updateTodo");
  // const validate = updateTodoSchema.safeParse(req.body);
  // if (!validate.success) {
  //   return res.status(400).json({ errors: validate.error.errors });
  // }
  console.log("updateTodo");
  try {
    const { data, error } = await supabase
      .from("todo")
      .update({ isCompleted: req.body.isCompleted })
      .eq("id", req.body.id);
    if (error) {
      return res
        .status(500)
        .json({ msg: "Update failed", error: error.message });
    }

    // if (!data || data.length === 0) {
    //   return res.status(404).json({ msg: "Todo not found" });
    // }
    // Fetch updated list
    const { data: todos, error: fetchError } = await supabase
      .from("todo")
      .select("*");
    console.log(todos);

    if (fetchError) {
      return res
        .status(500)
        .json({ msg: "Fetch failed", error: fetchError.message });
    }

    return res.json(todos);

    return res.json({ msg: "Todo updated successfully", todo: todos });
  } catch (err) {
    return res.status(500).json({ msg: "server error", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`server is listening at port ${PORT}`);
});
