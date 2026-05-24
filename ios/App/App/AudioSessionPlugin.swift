import AVFoundation
import Capacitor
import Foundation

@objc(AudioSessionPlugin)
public class AudioSessionPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "AudioSessionPlugin"
    public let jsName = "AudioSession"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "useSilentMode", returnType: CAPPluginReturnPromise)
    ]

    @objc public func useSilentMode(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            do {
                let session = AVAudioSession.sharedInstance()
                try session.setCategory(.soloAmbient, mode: .default, options: [])
                try session.setActive(true)
                call.resolve([
                    "category": session.category.rawValue
                ])
            } catch {
                call.reject("Unable to apply silent-mode-aware audio session", nil, error)
            }
        }
    }
}
