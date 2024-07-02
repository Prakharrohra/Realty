import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.use(express.json());

router.post("/register",async (req,res)=>{
    const { username, email, password } = req.body;
  console.log(req.body);

  try {
    // HASH THE PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    // CREATE A NEW USER AND SAVE TO DB
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);
    console.log('kuch bhi');
    // res.status(201).json({ message: "User created successfully" });
    return res.json(newUser);
    console.log('kuch alag');

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
});
// router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;