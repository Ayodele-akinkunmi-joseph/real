"use client"

import { TopNav } from "@/components/top-nav"
import { BottomNav } from "@/components/bottom-nav"
import { DesktopNav } from "@/components/desktop-nav"
import {
  Shield,
  Smartphone,
  Key,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Copy,
  Plus,
  Clock,
  MapPin,
  Zap,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/providers/auth-provider"

interface Device {
  id: string
  name: string
  type: "mobile" | "desktop" | "tablet"
  lastActive: string
  location: string
  isCurrentDevice: boolean
}

interface LoginAttempt {
  id: string
  timestamp: string
  status: "success" | "failed"
  location: string
  device: string
}

export default function SecurityPage() {
  const { user } = useAuth()
  const [notificationMessage, setNotificationMessage] = useState("")
  const [showNotification, setShowNotification] = useState(false)
  const [notificationType, setNotificationType] = useState<"success" | "error" | "warning">("success")

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [show2FASetup, setShow2FASetup] = useState(false)
  const [qrCode, setQrCode] = useState(
    "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/VibenPay:user@example.com?secret=JBSWY3DPEBLW64TMMQ======&issuer=VibenPay",
  )
  const [verificationCode, setVerificationCode] = useState("")
  const [backupCodes, setBackupCodes] = useState(["1234-5678", "9012-3456", "7890-1234", "5678-9012", "3456-7890"])
  const [showBackupCodes, setShowBackupCodes] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Chrome on MacBook Pro",
      type: "desktop",
      lastActive: "Now",
      location: "Lagos, Nigeria",
      isCurrentDevice: true,
    },
    {
      id: "2",
      name: "Safari on iPhone 14",
      type: "mobile",
      lastActive: "2 hours ago",
      location: "Lagos, Nigeria",
      isCurrentDevice: false,
    },
    {
      id: "3",
      name: "Chrome on Windows 11",
      type: "desktop",
      lastActive: "1 day ago",
      location: "Abuja, Nigeria",
      isCurrentDevice: false,
    },
  ])

  const [loginHistory, setLoginHistory] = useState<LoginAttempt[]>([
    {
      id: "1",
      timestamp: "2 minutes ago",
      status: "success",
      location: "Lagos, Nigeria",
      device: "Chrome on MacBook Pro",
    },
    { id: "2", timestamp: "2 hours ago", status: "success", location: "Lagos, Nigeria", device: "Safari on iPhone 14" },
    { id: "3", timestamp: "1 day ago", status: "failed", location: "Unknown, Unknown", device: "Firefox on Linux" },
    { id: "4", timestamp: "3 days ago", status: "success", location: "Abuja, Nigeria", device: "Chrome on Windows 11" },
  ])

  const [sessionTimeout, setSessionTimeout] = useState("30")
  const [biometricEnabled, setBiometricEnabled] = useState(false)

  const showNotify = (message: string, type: "success" | "error" | "warning" = "success") => {
    setNotificationMessage(message)
    setNotificationType(type)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const handle2FAEnable = () => {
    if (!verificationCode) {
      showNotify("Please enter the verification code", "warning")
      return
    }

    if (verificationCode !== "123456") {
      showNotify("Invalid verification code", "error")
      return
    }

    setTwoFactorEnabled(true)
    setVerificationCode("")
    setShow2FASetup(false)
    showNotify("Two-factor authentication enabled successfully!", "success")
  }

  const handle2FADisable = () => {
    if (window.confirm("Are you sure you want to disable 2FA? This reduces your account security.")) {
      setTwoFactorEnabled(false)
      setShowBackupCodes(false)
      showNotify("Two-factor authentication disabled", "warning")
    }
  }

  const copyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      showNotify("Please fill all password fields", "warning")
      return
    }

    if (newPassword !== confirmPassword) {
      showNotify("New passwords do not match", "error")
      return
    }

    if (newPassword.length < 8) {
      showNotify("Password must be at least 8 characters", "error")
      return
    }

    if (newPassword === currentPassword) {
      showNotify("New password must be different from current password", "error")
      return
    }

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    showNotify("Password changed successfully!", "success")
  }

  const handleRevokeDevice = (deviceId: string) => {
    if (devices.find((d) => d.id === deviceId)?.isCurrentDevice) {
      showNotify("Cannot revoke current device", "warning")
      return
    }

    setDevices(devices.filter((d) => d.id !== deviceId))
    showNotify("Device session revoked", "success")
  }

  const handleRevokeAllOtherDevices = () => {
    if (window.confirm("Revoke all other device sessions? You will need to log in again on other devices.")) {
      setDevices(devices.filter((d) => d.isCurrentDevice))
      showNotify("All other device sessions revoked", "success")
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TopNav />

      <div className="flex">
        <DesktopNav />

        <main className="flex-1 max-w-2xl mx-auto w-full pb-20 md:pb-0">
          {showNotification && (
            <div
              className={`fixed top-20 left-4 right-4 z-50 p-4 rounded-lg shadow-lg animate-in slide-in-from-top flex items-center gap-3 text-white ${
                notificationType === "success"
                  ? "bg-green-500"
                  : notificationType === "error"
                    ? "bg-red-500"
                    : "bg-yellow-500"
              }`}
            >
              {notificationType === "success" ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : notificationType === "error" ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="flex-1">{notificationMessage}</span>
              <button onClick={() => setShowNotification(false)} className="text-white/80 hover:text-white ml-2">
                ✕
              </button>
            </div>
          )}

          {/* Header */}
          <div className="px-4 md:px-6 py-6 border-b border-border bg-card">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold text-foreground">Security Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your account security, two-factor authentication, and active sessions
            </p>
          </div>

          <div className="p-4 md:p-6 space-y-6">
            {/* Security Overview */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Security Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-green-900 text-sm">Strong Password</p>
                    <p className="text-xs text-green-800">Your password meets security requirements</p>
                  </div>
                </div>
                <div
                  className={`flex items-start gap-3 p-3 rounded-lg border ${
                    twoFactorEnabled ? "bg-green-50 border-green-200" : "bg-yellow-50 border-yellow-200"
                  }`}
                >
                  {twoFactorEnabled ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-semibold text-sm ${twoFactorEnabled ? "text-green-900" : "text-yellow-900"}`}>
                      Two-Factor Authentication
                    </p>
                    <p className={`text-xs ${twoFactorEnabled ? "text-green-800" : "text-yellow-800"}`}>
                      {twoFactorEnabled ? "Enabled" : "Not enabled"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Management */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                Password Management
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
                    >
                      {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min. 8 characters)"
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use at least 8 characters with uppercase, lowercase, numbers, and symbols
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePasswordChange}
                  className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-primary" />
                  Two-Factor Authentication
                </h2>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    twoFactorEnabled ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Add an extra layer of security by requiring a verification code from your authenticator app in addition
                to your password.
              </p>

              {!twoFactorEnabled ? (
                <button
                  onClick={() => setShow2FASetup(true)}
                  className="w-full px-4 py-2.5 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Enable Two-Factor Authentication
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-900 font-semibold mb-2">Two-Factor Authentication Active</p>
                    <p className="text-xs text-green-800">
                      Your account is protected with two-factor authentication. You'll need to enter a code from your
                      authenticator app when logging in.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowBackupCodes(!showBackupCodes)}
                    className="w-full px-4 py-2.5 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
                  >
                    {showBackupCodes ? "Hide" : "Show"} Backup Codes
                  </button>

                  {showBackupCodes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-yellow-900">Save Your Backup Codes</p>
                          <p className="text-xs text-yellow-800">
                            Keep these codes in a safe place. Use them to access your account if you lose access to your
                            authenticator app.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {backupCodes.map((code, idx) => (
                          <button
                            key={idx}
                            onClick={() => copyBackupCode(code)}
                            className={`px-3 py-2 rounded border text-xs font-mono transition ${
                              copiedCode === code
                                ? "bg-green-100 border-green-300 text-green-700"
                                : "bg-white border-yellow-200 text-foreground hover:bg-yellow-100"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span>{code}</span>
                              <Copy className="w-3 h-3" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handle2FADisable}
                    className="w-full px-4 py-2.5 border border-destructive text-destructive rounded-lg font-semibold hover:bg-destructive/10 transition"
                  >
                    Disable Two-Factor Authentication
                  </button>
                </div>
              )}

              {show2FASetup && !twoFactorEnabled && (
                <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-foreground">Setup Two-Factor Authentication</h3>

                  <div className="space-y-2">
                    <p className="text-sm text-foreground font-medium">Step 1: Scan QR Code</p>
                    <p className="text-xs text-muted-foreground">
                      Use an authenticator app (Google Authenticator, Authy, or Microsoft Authenticator) to scan this QR
                      code:
                    </p>
                    <div className="bg-white p-4 rounded flex justify-center">
                      <img src={qrCode || "/placeholder.svg"} alt="2FA QR Code" className="w-32 h-32" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-foreground font-medium">Step 2: Enter Verification Code</p>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.slice(0, 6))}
                      placeholder="000000"
                      maxLength={6}
                      className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground text-center tracking-widest font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-xs text-muted-foreground">Demo code: 123456</p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShow2FASetup(false)
                        setVerificationCode("")
                      }}
                      className="flex-1 px-4 py-2.5 border border-border text-foreground rounded-lg font-semibold hover:bg-muted transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handle2FAEnable}
                      className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition"
                    >
                      Verify & Enable
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Active Devices & Sessions */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-foreground">Active Devices</h2>
                <button
                  onClick={handleRevokeAllOtherDevices}
                  className="text-xs font-medium text-destructive hover:text-destructive/80 transition"
                >
                  Revoke All Other
                </button>
              </div>

              <div className="space-y-3">
                {devices.map((device) => (
                  <div key={device.id} className="border border-border rounded-lg p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-foreground">{device.name}</p>
                            {device.isCurrentDevice && (
                              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 mt-2">
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Last active: {device.lastActive}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {device.location}
                            </p>
                          </div>
                        </div>
                      </div>
                      {!device.isCurrentDevice && (
                        <button
                          onClick={() => handleRevokeDevice(device.id)}
                          className="px-3 py-1 text-xs font-medium text-destructive border border-destructive rounded hover:bg-destructive/10 transition"
                        >
                          Revoke
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Login History */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Login History</h2>

              <div className="space-y-2">
                {loginHistory.map((attempt) => (
                  <div
                    key={attempt.id}
                    className="flex items-start justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${
                          attempt.status === "success" ? "bg-green-500" : "bg-destructive"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground text-sm">
                          {attempt.status === "success" ? "Successful login" : "Failed login attempt"}
                        </p>
                        <p className="text-xs text-muted-foreground">{attempt.device}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {attempt.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground ml-2 flex-shrink-0">{attempt.timestamp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Session Timeout */}
            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-lg font-bold text-foreground">Session Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Automatic Logout After</label>
                  <select
                    value={sessionTimeout}
                    onChange={(e) => {
                      setSessionTimeout(e.target.value)
                      showNotify("Session timeout updated", "success")
                    }}
                    className="w-full px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="480">8 hours</option>
                    <option value="never">Never</option>
                  </select>
                  <p className="text-xs text-muted-foreground mt-2">
                    You will be automatically logged out after this period of inactivity
                  </p>
                </div>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={biometricEnabled}
                    onChange={(e) => {
                      setBiometricEnabled(e.target.checked)
                      showNotify(e.target.checked ? "Biometric login enabled" : "Biometric login disabled", "success")
                    }}
                    className="w-4 h-4"
                  />
                  <div>
                    <p className="font-medium text-foreground text-sm">Enable Biometric Login</p>
                    <p className="text-xs text-muted-foreground">Use fingerprint or face recognition to login faster</p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  )
}
