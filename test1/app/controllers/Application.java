package controllers;

import models.Person;
import play.*;
import play.data.Form;
import play.mvc.*;

import views.html.*;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public static Result addPerson(){
        Person person = Form.form(Person.class).bindFromRequest().get();
        person.save();
        return ok(index.render("Test"));
    }

}
