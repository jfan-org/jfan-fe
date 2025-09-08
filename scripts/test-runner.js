#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
}

const log = (message, color = colors.reset) => {
    console.log(`${color}${message}${colors.reset}`)
}

const runCommand = (command, description) => {
    log(`\n${colors.blue}Running: ${description}${colors.reset}`)
    log(`${colors.cyan}Command: ${command}${colors.reset}`)

    try {
        execSync(command, { stdio: 'inherit' })
        log(`${colors.green}✓ ${description} completed successfully${colors.reset}`)
        return true
    } catch (error) {
        log(`${colors.red}✗ ${description} failed${colors.reset}`)
        return false
    }
}

const main = () => {
    log(`${colors.bright}${colors.magenta}🧪 JFAN Frontend Test Suite Runner${colors.reset}`)
    log(`${colors.yellow}Running comprehensive test suite for authentication and onboarding...${colors.reset}`)

    const testSuites = [
        {
            command: 'npm test -- --testPathPattern="components" --verbose',
            description: 'Component Unit Tests',
        },
        {
            command: 'npm test -- --testPathPattern="utils" --verbose',
            description: 'Utility Function Tests',
        },
        {
            command: 'npm test -- --testPathPattern="integration" --verbose',
            description: 'Integration Tests',
        },
        {
            command: 'npm test -- --testPathPattern="e2e" --verbose',
            description: 'End-to-End Tests',
        },
    ]

    let allPassed = true

    // Run individual test suites
    for (const suite of testSuites) {
        const passed = runCommand(suite.command, suite.description)
        if (!passed) {
            allPassed = false
        }
    }

    // Generate coverage report
    log(`\n${colors.blue}Generating coverage report...${colors.reset}`)
    const coveragePassed = runCommand(
        'npm run test:coverage -- --silent',
        'Coverage Report Generation'
    )

    if (!coveragePassed) {
        allPassed = false
    }

    // Summary
    log(`\n${colors.bright}${colors.magenta}📊 Test Suite Summary${colors.reset}`)

    if (allPassed) {
        log(`${colors.green}${colors.bright}✅ All tests passed successfully!${colors.reset}`)
        log(`${colors.green}Coverage report available at: coverage/lcov-report/index.html${colors.reset}`)
    } else {
        log(`${colors.red}${colors.bright}❌ Some tests failed. Please check the output above.${colors.reset}`)
        process.exit(1)
    }

    // Check coverage thresholds
    const coveragePath = path.join(__dirname, '..', 'coverage', 'coverage-summary.json')
    if (fs.existsSync(coveragePath)) {
        const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'))
        const total = coverage.total

        log(`\n${colors.bright}Coverage Summary:${colors.reset}`)
        log(`Lines: ${total.lines.pct}%`)
        log(`Functions: ${total.functions.pct}%`)
        log(`Branches: ${total.branches.pct}%`)
        log(`Statements: ${total.statements.pct}%`)

        const minCoverage = 80
        const lowCoverage = [
            total.lines.pct < minCoverage && 'Lines',
            total.functions.pct < minCoverage && 'Functions',
            total.branches.pct < minCoverage && 'Branches',
            total.statements.pct < minCoverage && 'Statements',
        ].filter(Boolean)

        if (lowCoverage.length > 0) {
            log(`${colors.yellow}⚠️  Coverage below ${minCoverage}% for: ${lowCoverage.join(', ')}${colors.reset}`)
        }
    }
}

if (require.main === module) {
    main()
}