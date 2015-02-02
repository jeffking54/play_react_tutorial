package controllers;

import models.Person;
import play.*;
import play.data.Form;
import play.db.ebean.Model;
import play.mvc.*;

import views.html.*;

import java.util.List;

import static play.libs.Json.toJson;

public class Application extends Controller {

    public static Result index() {
        return ok(index.render("Your new application is ready."));
    }

    public static Result addPerson(){
        Person person = Form.form(Person.class).bindFromRequest().get();
        person.save();
        return ok(index.render("Your new application is ready."));
    }

    public static Result getPersons() {
        List<Person> personList = new Model.Finder<>(String.class, Person.class).all();
        return ok(toJson(personList));
     }
}
