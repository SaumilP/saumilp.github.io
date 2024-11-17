+++
title = "Dev machine setup for Flutter App development"
date = 2024-11-16
draft = false
description = "Setting up Flutter on macOS can be staightforward..."

[taxonomies]
tags = ["flutter", "dart", "osx", "homebrew"]
categories = ["shell"]

[extra]
disable_comments = true
+++

![Flutter on macOS](/img/2024/dev-machine-setup-flutter-osx/macOs-dev-machine-setup.webp)

Setting up [Flutter](https://flutter.dev/){:target="_blank"} on macOS can be staightforward process when using [Homebrew](https://brew.sh/){:target="_blank"}, a popular package manager for macOS. Flutter, a powerful open-source UI software development toolkit by Google, enables developers to build natively compiled mobile, web, and desktop applications from a single codebase. In this guide, we’ll walk you through the necessary steps to install and configure Flutter on macOS system using Homebrew. Additionally, we will cover the installation of essential tools like Android Studio and Xcode, update Ruby, and set up CocoaPods to ensure a smooth development experience.<!-- more --> These setup steps helps with setup and standardize across various machines. Follow along to set up your Flutter environment and build your next great app!

To install Flutter on macOS using Homebrew, follow these steps:
### 1. Install Homebrew
Open Terminal and run:
```bash
$> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
### 2. Install Flutter using Homebrew
In Terminal, run:
```bash
$> brew install --cask flutter
```
### 3. Verify Flutter installation
After successful installation, verify if Flutter is correctly installed by checking version:
```bash
$> flutter --version
```
### 4. Configure PATH
Add the Flutter SDK to your system PATH variable. You can do this by adding flollwing line in to your shell configuration file.
```bash
$> vim ˜/.zshrc
```
Paste,
```bash
export PATH="$PATH:/usr/local/Caskroom/flutter/3.24.5/flutter/bin"
```
To save the changes, Ctrl+X and Press 'Enter'.
To find Flutter path, run:
```bash
$> which flutter
```
Load newly captured conigs:
```bash
$> source ˜/.zshrc
```
### 5. Run Flutter doctor
Finally, check for any dependencies or issues by running:
```bash
$> flutter doctor
```
### 6. Install Android Studio
```bash
$> brew install --cask android-studio
```
### 7. Install Xcode using App Store and Setup
### 8. Update Ruby using Homebrew
```bash
$> brew install ruby
```
### 9. Add the new Ruby version to PATH environment variable
Open your shell configuration file (~/.zshrc or ~/.bash_profile) in a text editor and add the following line:
(Save Ctrl X and Enter)
```bash
export PATH="/opt/homebrew/opt/ruby/bin:$PATH"
source ˜/.zshrc
```
### 10. Verify the Ruby version
Ensure the updated Ruby version is now in use:
```bash
$> ruby -v
```
### 11. Install CocoaPods
```bash
$> sudo gem install cocoapods
```

By following the steps outlined above, you can successfully install Flutter on your macOS system using Homebrew. This installation includes configuring essential development tools such as Android Studio and Xcode, which are required for Flutter development on macOS. Additionally, updating Ruby and installing CocoaPods ensures compatibility and smooth operation of the development environment. After completing these steps, you’ll be ready to start building and running Flutter applications on your macOS machine. Remember to periodically run flutter doctor to check for any additional dependencies or updates needed to maintain your development environment.
