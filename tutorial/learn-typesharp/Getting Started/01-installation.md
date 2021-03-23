# Installation

In order to use TypeSharp, you must install it first. This guide will use the official [Typesharp CLI]() for managing typesharp versions, and associated utilities.

## Installing *t#*

[TypeSharp CLI]() is TypeSharp's command line interface / package manager that can be invoked using `t#` or `ts` in command line.

> **Note:** If you are migrating from typescript, and have an alias for typescript set as `ts` you will need to remove it.

To install TypeSharp's CLI you will need to open a shell session and enter the following command:

```shell
curl http://localhost:9328/bin/u/latest -sSf | sh
```

or if on windows:

```powershell
iwr -useb http://localhost:9328/bin/10/latest | iex; install
```

with this command executed, you have successfully installed typesharp (awesome!).



## Updating or Uninstalling

If you decide you don't like Typesharp, you can run:

```shell
ts uninstall -y
```

If you would like to update to a newer version of TypeSharp, you can run:

```shell
ts upgrade
```

If you would like to change to a different/specific version of TypeSharp you can use:

```shell
ts upgrade --version "1.0.0"
```

