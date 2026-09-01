import com.android.build.gradle.internal.api.BaseVariantOutputImpl

android {
    namespace = "net.artkitty.sfm256"
    compileSdk = 34

    defaultConfig {
        applicationId = "net.artkitty.sfm256"
        minSdk = 26
        targetSdk = 34
        versionCode = 100
        versionName = "1.0.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }

    // Dynamic Package-Specific Output Rename (Zero-Anxiety Binaries)
    applicationVariants.all {
        val variant = this
        variant.outputs.all {
            val output = this as? BaseVariantOutputImpl
            output?.outputFileName = "${variant.applicationId}_v${variant.versionName}_debug.apk"
        }
    }
}

// Automated compilation trigger task to dump ready binaries direct to virtual sync paths
tasks.register<Copy>("exportApkToGDrive") {
    dependsOn("assembleDebug")
    from("build/outputs/apk/debug")
    into(file("G:/My Drive/myapks"))
    include("*.apk")
}
