const Course  = require('../../models/Course');

const courseController = {
  createCourse: async (req, res) => {
    try{
        const { title, description,}=req.body;
        const course = new Course({
            title,
            description,
            
        });
        await course.save();


      res.status(200).send({
        status: true,
        message: "Course Created Successfully",
      });
    } catch(err){
      res.status(400).send({
        status: false,
        message: "Error: " + err.message,
      });
    }
  },
  updateCourse: async (req, res) => {
    try{
      
      const { id } = req.params;
      const { body } = req;
      for (let i = 1; i < course.length; i++){
        if (course[i].id === id) {
          course[i] = { ...course[i], ...body };
          break;
        }
      }


      res.status(200).send({
        status: true,
        message: "Course Updated Successfully",
        data:course[i],
      });
    } catch(err){
      res.status(400).send({
        status: false,
        message: "Error: " + err.message,
      });
    }
  }
}

module.exports = courseController;