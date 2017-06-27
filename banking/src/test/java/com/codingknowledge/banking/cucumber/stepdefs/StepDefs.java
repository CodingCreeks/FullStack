package com.codingknowledge.banking.cucumber.stepdefs;

import com.codingknowledge.banking.BankingApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = BankingApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
