package com.codingknowledge.onlinecourse.cucumber.stepdefs;

import com.codingknowledge.onlinecourse.OnlinecourseApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = OnlinecourseApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
