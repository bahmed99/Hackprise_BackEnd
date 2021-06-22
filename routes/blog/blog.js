const express = require("express")
const router = express.Router()
const Blog = require("../../models/blog");
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});


const upload = multer({
    storage: storage,
})


router.get("/:id", (req, res) => {
    const blog_id = req.params.id
    Blog.findById(blog_id).then((blog) => {
        res.json(blog)
    }).catch(err => {
        console.log(err)
    })

})

router.get("/", (req, res) => {
    Blog.find().then((blogs) => {
        res.send(JSON.stringify(blogs))
    }).catch((err) => {
        console.log(err)
    })
})


router.post("/", upload.single('image'), (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        content: req.body.content,
        writer: req.body.writer,
        image: req.file.originalname


    })
    newBlog.save().then((result) => {
        console.log(result)
        res.send(JSON.stringify(result))
    }).catch(err => {
        console.log(err)
        res.send(JSON.stringify({ error: "Error adding this to the db" }))
    })
})

router.delete("/:id", (req, res) => {
    const blog_id = req.params.id
    Blog.findById(blog_id).then((blogToDelete) => {
        blogToDelete.delete()
        res.send(JSON.stringify(blogToDelete))
    }).catch(err => {
        console.log(err)
    })

})


router.put("/:id", upload.single('image'), (req, res) => {

    Blog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        content: req.body.content,
        writer: req.body.writer,
        image: req.file.originalname

    }).then((result) => {
        res.send(JSON.stringify(result))
    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router